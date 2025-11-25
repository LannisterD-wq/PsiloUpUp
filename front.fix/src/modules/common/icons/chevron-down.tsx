import React from "react"

type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>

const ChevronDown: React.FC<IconProps> = ({
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
        d="M5 7.5L10 12.5L15 7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronDown
