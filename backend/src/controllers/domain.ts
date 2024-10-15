import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import {domainAndSubdomainInput, DomainAndSubdomainParams, DomainNameOnly, GetDomainResponse} from '@rkhan76/common'


const prisma = new PrismaClient()

export const handleCreateOrUpdateDomain = async (
  req: Request,
  res: Response
) => {
  const {
    domainName,
    subdomains,
  }: DomainAndSubdomainParams = req.body

  const validZodResult = domainAndSubdomainInput.safeParse(req.body)

   if (!validZodResult.success) {
     const validationErrors = validZodResult.error.errors.map((error) => ({
       path: error.path,
       message: error.message,
     }))
   }
  
  try {
    let domain = await prisma.domain.findUnique({
      where: {
        name: domainName,
      },
      include: {
        subdomains: true, // Ensure subdomains are included
      },
    })

    if (!domain) {
      // Create the domain along with subdomains
      domain = await prisma.domain.create({
        data: {
          name: domainName,
          subdomains:
            subdomains.length > 0
              ? {
                  create: subdomains.map((subdomain) => ({
                    name: subdomain,
                  })),
                }
              : undefined,
        },
        include: {
          subdomains: true, // Ensure subdomains are included after creation
        },
      })

      // Select only the necessary fields to avoid circular references
      const responseData = {
        name: domain.name,
        subdomains: domain.subdomains.map((sub) => ({ name: sub.name })),
      }

      return res.status(201).json({
        success: true,
        message: 'Domain and subdomains created successfully!',
        data: responseData,
      })
    } else {
      if (subdomains.length > 0) {
        const existingSubdomains = domain.subdomains.map((sub) => sub.name)
        const newSubdomains = subdomains.filter(
          (subdomain) => !existingSubdomains.includes(subdomain)
        )

        if (newSubdomains.length > 0) {
          const domainId = domain.id

          // Create new subdomains for the existing domain
          await prisma.subdomain.createMany({
            data: newSubdomains.map((subdomain) => ({
              name: subdomain,
              domainId: domainId, // Link subdomains to the existing domain
            })),
          })

          // Refetch the domain with the updated subdomains
          domain = await prisma.domain.findUnique({
            where: {
              id: domain.id,
            },
            include: {
              subdomains: true,
            },
          })

          const updatedResponseData = {
            name: domain?.name,
            subdomains: domain?.subdomains.map((sub) => ({ name: sub.name })),
          }

          return res.status(200).json({
            success: true,
            message: 'New subdomains added to the domain successfully!',
            data: updatedResponseData,
          })
        } else {
          // All subdomains already exist
          return res.status(200).json({
            success: true,
            message: 'All provided subdomains already exist.',
            data: {
              name: domain.name,
              subdomains: domain.subdomains.map((sub) => ({ name: sub.name })),
            },
          })
        }
      } else {
        // No new subdomains provided, but domain exists
        return res.status(200).json({
          success: true,
          message: 'Domain already exists, no new subdomains provided.',
          data: {
            name: domain.name,
            subdomains: domain.subdomains.map((sub) => ({ name: sub.name })),
          },
        })
      }
    }
  } catch (error) {
    console.error('Error creating or updating domain:', error)
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while creating or updating the domain.',
    })
  }
}

export async function handleGetDomainsWithSubdomains(
  req: Request,
  res: Response
) {
  try {
    const domains = await prisma.domain.findMany({
      include: {
        subdomains: true, // Include related subdomains
      },
    })

    return res.json({
      success: true,
      data: domains,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong with the server',
    })
  } finally {
    await prisma.$disconnect()
  }
}

export async function handleGetDomainOnly(
  req: Request,
  res: Response<GetDomainResponse>
) {
  try {
    const domains: DomainNameOnly[] = await prisma.domain.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    if (!domains || domains.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No domains found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully fetched the domains',
      data: domains,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong with the server',
    })
  }
}

export async function handleGetSubdomainOnly(req: Request, res: Response) {
  const { domainId }: { domainId: string } = req.body

  try {
    const subdomains = await prisma.subdomain.findMany({
      where: {
        domainId: domainId,
      },
    })

    if (!subdomains) {
      return res.status(400).json({
        success: true,
        message: 'something went wrong while fetching subdomains detail',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'successfully fetch the subdomains detail',
      data: subdomains,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'something went wrong with server',
    })
  }
}

export async function handleGetSubdomainsByDomain(req: Request, res: Response) {
  const { domainId } = req.query

  if (!domainId) {
    return res.status(400).json({
      success: false,
      message: 'domainId query parameter is required',
    })
  }

  try {
    // Fetch subdomains associated with the given domainId
    const subdomains = await prisma.subdomain.findMany({
      where: {
        domainId: domainId as string, // Type assertion for domainId
      },
    })

    if (!subdomains.length) {
      return res.status(404).json({
        success: false,
        message: `No subdomains found for domainId: ${domainId}`,
      })
    }

    return res.status(200).json({
      success: true,
      subdomains,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching subdomains',
    })
  }
}
