import React from "react"

type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>

const Minus: React.FC<IconProps> = ({
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
        d="M4.16669 10H15.8334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Minus
