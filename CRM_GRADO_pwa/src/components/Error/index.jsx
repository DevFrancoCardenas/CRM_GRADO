import React from "react"
import './Error.css'

export default function Error({title,errors=[]}) {
    if (!title || !errors.length) {
        return null;
    }
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <a className="h-5 w-5 text-red-400" aria-hidden="true">❌</a>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{title}</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <ul role="list" className="list-disc space-y-1 pl-5">
                            {errors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}