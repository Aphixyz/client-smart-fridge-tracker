import React from 'react'

type BaseCardProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

function BaseCard({ children, className = '', onClick }: BaseCardProps) {
    return (
        <div
            onClick={onClick}
            role={onClick ? "button" : undefined}
            className={`w-full bg-white space-y-2 p-5 border border-gray-200 rounded-xl ${onClick ? "cursor-pointer" : ""
                } ${className}`.trim()}>
            {children}

        </div>
    )
}

export default BaseCard
