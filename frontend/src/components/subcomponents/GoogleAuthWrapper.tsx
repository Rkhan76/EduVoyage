// // GoogleAuthWrapper.tsx
// import React from 'react'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import GoogleAuthContainer from '../../container/GoogleAuthContainer'

// interface GoogleAuthWrapperProps {
//   onSuccess?: (response: any) => void
//   onError?: () => void
// }

// export const GoogleAuthWrapper: React.FC<GoogleAuthWrapperProps> = ({
//   onSuccess,
//   onError,
// }) => {
//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <GoogleAuthContainer onSuccess={onSuccess} onError={onError} />
//     </GoogleOAuthProvider>
//   )
// }
