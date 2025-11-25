import React from "react"

type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>

const Refresh: React.FC<IconProps> = ({
  color = "currentColor",
  size = 20,
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M14.166 5.83331H17.4993V2.49998"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7138 14.7138C13.8046 15.623 12.6633 16.2649 11.4175 16.5693C10.1716 16.8737 8.86802 16.8288 7.64574 16.4396C6.42346 16.0505 5.32883 15.3319 4.48313 14.3642C3.63744 13.3965 3.07227 12.2166 2.85027 10.9532C2.62826 9.68979 2.75777 8.39133 3.22456 7.19372C3.69135 5.99611 4.47818 4.94408 5.4987 4.14724C6.51923 3.3504 7.73544 2.83799 9.02155 2.66311C10.3077 2.48823 11.6157 2.65742 12.8093 3.15331L17.4993 5.83331"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Refresh
