import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
    return (
            <div className="container">
                <div className="dashboard">
                <Link to='/newarticle'>Create los new Article </Link>
                </div>
            </div>
    )
}
