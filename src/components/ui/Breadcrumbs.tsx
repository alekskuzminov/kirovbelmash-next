import Link from 'next/link';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
    textColor?: string;
    activeTextColor?: string;
    hoverColor?: string;
}

export default function Breadcrumbs({
    items,
    className = "mb-3",
    textColor = "text-gray-500",
    activeTextColor = "text-gray-900",
    hoverColor = "hover:text-red-600"
}: BreadcrumbsProps) {
    return (
        <nav className={`flex items-center text-xs sm:text-sm ${textColor} ${className} overflow-x-auto whitespace-nowrap`}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center flex-shrink-0">
                        {item.href && !isLast ? (
                            <Link href={item.href} className={`${hoverColor} transition-colors cursor-pointer`}>
                                {item.label}
                            </Link>
                        ) : (
                            <span className={`${activeTextColor} font-medium ${isLast ? "truncate" : ""}`}>
                                {item.label}
                            </span>
                        )}
                        {!isLast && (
                            <svg className={`w-4 h-4 mx-1 ${textColor} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
