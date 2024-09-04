// custom-elements.d.ts

declare namespace JSX {
    interface IntrinsicElements {
      'l-tail-chase': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: string;
        speed?: string;
        color?: string;
      };
    }
  }
  