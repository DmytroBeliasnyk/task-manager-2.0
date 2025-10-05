import type {FC} from "react";
import clsx from "clsx/lite";

type ButtonProps = {
  text: string
  type: 'button' | 'submit' | 'reset'
  clickHandler?: () => void
}
/*
передавать text как children
тип кнопки и обработчик клика принимать rest оператором
передавать пропсами настройки для стилей кнопки(например размер)
*/
export const Button: FC<ButtonProps>= ({text, type, clickHandler}) => {
  const buttonClass: string = clsx(
    'py-2 px-4 rounded-md bg-highlight-bg outline-none cursor-pointer',
    'font-xl font-semibold text-text-secondary',
    'hover:bg-focus-bg'
  )

  return (
    <button
      className={buttonClass}
      type={type}
      onClick={clickHandler}
    >{text}</button>
  )
}