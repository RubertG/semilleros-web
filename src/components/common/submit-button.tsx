import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  isPending?: boolean;
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, isPending, ...props }: Props) {
  return (
    <button {...props} type="submit" aria-disabled={isPending}>
      {isPending ? pendingText : children}
    </button>
  );
}
