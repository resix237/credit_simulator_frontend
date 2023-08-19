import { Suspense, useState } from 'react'
import { useOutlet, useLoaderData, Await } from 'react-router-dom'
import { AuthProvider } from '../../hooks';

// layout for a user who is authenticated
function AuthLayout() {
    const oulet = useOutlet();
    const { userPromise }: any = useLoaderData()
    return (
        <Suspense>
            <Await
                resolve={userPromise}
                errorElement={<div>Un eerreur a survenu </div>}
                children={
                    (user) => (<AuthProvider userData={user}>{oulet}</AuthProvider>)
                }
            />
        </Suspense>
    )
}

export default AuthLayout
