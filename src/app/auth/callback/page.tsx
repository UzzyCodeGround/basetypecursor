// 'use client'

// import { useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { supabase } from '@/lib/supabase'

// export default function AuthCallbackPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     const handleAuthCallback = async () => {
//       const code = searchParams.get('code')
      
//       if (code) {
//         try {
//           // Exchange the code for a session
//           const { data: sessionData, error: signInError } = await supabase.auth.exchangeCodeForSession(code)
          
//           if (signInError) {
//             console.error('Sign in error:', signInError)
//             router.push('/login?error=' + encodeURIComponent(signInError.message))
//             return
//           }

//           // Get the current user
//           const { data: { user }, error: userError } = await supabase.auth.getUser()
          
//           if (userError) {
//             console.error('Get user error:', userError)
//             router.push('/login?error=' + encodeURIComponent(userError.message))
//             return
//           }

//           if (user) {
//             // Check if user exists in the database
//             const { data: existingUser, error: dbError } = await supabase
//               .from('users')
//               .select('id')
//               .eq('id', user.id)
//               .single()

//             if (dbError && dbError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
//               console.error('Database error:', dbError)
//               router.push('/login?error=' + encodeURIComponent('Error checking user status'))
//               return
//             }

//             // If user doesn't exist, create them
//             if (!existingUser) {
//               const { error: insertError } = await supabase
//                 .from('users')
//                 .insert([
//                   {
//                     id: user.id,
//                     email: user.email,
//                     created_at: new Date().toISOString(),
//                     updated_at: new Date().toISOString()
//                   },
//                 ])

//               if (insertError) {
//                 console.error('Create user error:', insertError)
//                 router.push('/login?error=' + encodeURIComponent('Error creating user account'))
//                 return
//               }
//             }

//             // Redirect to onboarding
//             router.push('/onboarding')
//           }
//         } catch (err) {
//           console.error('Auth callback error:', err)
//           router.push('/login?error=' + encodeURIComponent('Failed to authenticate'))
//         }
//       } else {
//         router.push('/login?error=' + encodeURIComponent('No authentication code found'))
//       }
//     }

//     handleAuthCallback()
//   }, [router, searchParams])

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold">Completing sign in...</h2>
//         <p className="text-gray-500 mt-2">Please wait while we complete your authentication.</p>
//       </div>
//     </div>
//   )
// } 