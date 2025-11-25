import React from "react"

type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>

const FastDelivery: React.FC<IconProps> = ({
  color = "currentColor",
  size = 24,
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M8.5 19H5.5C4.94772 19 4.5 18.5523 4.5 18V13.5H2L10 6L13 8.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 19H22V12L18.5 8H14V19Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="19" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="7" cy="19" r="2" stroke={color} strokeWidth="1.5" />
      <path d="M11 19H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 10H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 13H4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default FastDelivery
