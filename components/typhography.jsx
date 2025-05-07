"use client"

export function Typography({ className = "", children }) {
    return (
        <span className={className}>
            {children}
        </span>
    )
}
