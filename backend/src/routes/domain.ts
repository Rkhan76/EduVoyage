import express from 'express'
import {
  handleCreateOrUpdateDomain,
  handleGetDomainsWithSubdomains,
  handleGetDomainOnly,
  handleGetSubdomainOnly,
  handleGetSubdomainsByDomain,
} from '../controllers/domain'
import { handleAuthentication } from '../middlewares/auth'

const router = express.Router()

// Create and update the domain( add subdomain if domain already exits )
router.post("/domain", handleAuthentication, handleCreateOrUpdateDomain)
router.get('/alldomains', handleGetDomainsWithSubdomains)
router.get("/domain", handleGetDomainOnly)
router.get("/subdomainsbydomain", handleGetSubdomainsByDomain)
router.get("/allSubdomains", handleGetSubdomainOnly)

export default router


// {
//     "success": true,
//     "data": [
//         {
//             "id": "a8a29ecd-ac50-4686-aeda-b2dbcaefd3b2",
//             "name": "Data Science",
//             "courses": [],
//             "subdomains": [
//                 {
//                     "id": "59809399-3c6b-4b94-8248-752d18cecd50",
//                     "name": "Python",
//                     "domainId": "a8a29ecd-ac50-4686-aeda-b2dbcaefd3b2",
//                     "courses": []
//                 },
//                 {
//                     "id": "6e10c639-9645-4f01-9d8c-1e5aa288ad68",
//                     "name": "Machine Learning",
//                     "domainId": "a8a29ecd-ac50-4686-aeda-b2dbcaefd3b2",
//                     "courses": []
//                 },
//                 {
//                     "id": "2e0f1674-52b8-490a-a4c9-4b646ff8770e",
//                     "name": "Data Visualization",
//                     "domainId": "a8a29ecd-ac50-4686-aeda-b2dbcaefd3b2",
//                     "courses": []
//                 }
//             ]
//         },
//         {
//             "id": "1110c153-9ee5-4e81-83ba-27beb8e9522e",
//             "name": "Mobile Development",
//             "courses": [],
//             "subdomains": [
//                 {
//                     "id": "5e0cfa7b-68a7-4b3a-9834-78f839f15144",
//                     "name": "iOS",
//                     "domainId": "1110c153-9ee5-4e81-83ba-27beb8e9522e",
//                     "courses": []
//                 },
//                 {
//                     "id": "3a153fda-8bba-4a75-918a-41bab183edc8",
//                     "name": "Android",
//                     "domainId": "1110c153-9ee5-4e81-83ba-27beb8e9522e",
//                     "courses": []
//                 },
//                 {
//                     "id": "20532d2d-c70b-4708-8fb9-f9e12cd93ff3",
//                     "name": "Flutter",
//                     "domainId": "1110c153-9ee5-4e81-83ba-27beb8e9522e",
//                     "courses": []
//                 }
//             ]
//         },
//         {
//             "id": "34041bff-1e75-4321-82ab-293b03a6bf82",
//             "name": "Web Development",
//             "courses": [
//                 "97328206-ca92-4be0-a197-f0115e0a0db0",
//                 "692b6334-1402-4cbe-8b6c-0d7b7810ca61"
//             ],
//             "subdomains": [
//                 {
//                     "id": "fa77123a-3f48-4ed5-8223-cec1d691a0fe",
//                     "name": "JavaScript",
//                     "domainId": "34041bff-1e75-4321-82ab-293b03a6bf82",
//                     "courses": [
//                         "97328206-ca92-4be0-a197-f0115e0a0db0",
//                         "692b6334-1402-4cbe-8b6c-0d7b7810ca61"
//                     ]
//                 },
//                 {
//                     "id": "a99db915-4adb-47f2-a4d5-6c38a675e3c2",
//                     "name": "React",
//                     "domainId": "34041bff-1e75-4321-82ab-293b03a6bf82",
//                     "courses": [
//                         "97328206-ca92-4be0-a197-f0115e0a0db0",
//                         "692b6334-1402-4cbe-8b6c-0d7b7810ca61"
//                     ]
//                 },
//                 {
//                     "id": "2b610324-a1be-428d-8c08-4f051169cd98",
//                     "name": "CSS",
//                     "domainId": "34041bff-1e75-4321-82ab-293b03a6bf82",
//                     "courses": [
//                         "692b6334-1402-4cbe-8b6c-0d7b7810ca61"
//                     ]
//                 }
//             ]
//         }
//     ]
// }