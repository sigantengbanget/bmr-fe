"use client"
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

type Props = {}

const LogoutButton = (props: Props) => {
    return (
        <Button onClick={() => signOut()}>Logout</Button>
    )
}

export default LogoutButton