import styled, { css } from "styled-components";
import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

export type ButtonColorType = "primary" | "secondary" | "success" | "warning" | "info" | "error";
export type ButtonVariantType = "contained" | "text" | "icon";

const iconStyle = css`
    line-height: 1;
    padding: 8px;
    border-radius: 50%;
`;

const StyledButton = styled.button<{ $color: ButtonColorType; $variant: ButtonVariantType }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => (props.$variant === "contained" ? props.theme.color[props.$color] : "transparent")};
    font-size: 14px;
    font-weight: 600;
    color: ${props => (props.$variant === "contained" ? "#FFFFFF" : props.theme.color[props.$color])};
    padding: 8px 16px;
    border-radius: 6px;
    transition: all 0.5s;

    &:hover {
        filter: brightness(0.8);
        background-color: ${props => (props.$variant === "contained" ? undefined : props.theme.color.background.default)};
    }

    ${props => props.$variant === "icon" && iconStyle}
`;

// 우리가 만드는 이 Button 이라는 이름의 컴포넌트는
// button 태그처럼 사용하되 모양이 우리가 원하는대로 나오고 color 속성도 받아들여주길
// 바래서 만드는 것.
// 그러니까 button 태그가 받을 수 있는 속성을 모두 다 허용해줘 => "상속" (interface)
// button 태그의 타입 : ButtonHTMLAttributes<HTMLButtonElement>
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    color: ButtonColorType;
    variant: ButtonVariantType;
    as?: ElementType;
    to?: string;
}

// 구조분해할당에서 내가 원하는 애들에 대해서만 이름을 붙이고
// 나머지는 뭉뚱그려서 '...x' 라고 부를게
function Button({ children, color, variant, ...x }: Props) {
    return (
        <StyledButton $color={color} $variant={variant} {...x}>
            {children}
        </StyledButton>
    );
}

export default Button;
