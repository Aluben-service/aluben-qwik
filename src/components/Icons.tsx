import type { PropsOf } from "@builder.io/qwik";

export function ArrowBackIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h14m-4 4l4-4m-4-4l4 4"
      />
    </svg>
  );
}
export function ArrowForwardIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M5 12h14M5 12l6 6m-6-6l6-6"
      ></path>
    </svg>
  );
}

export function RefreshIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"
      ></path>
    </svg>
  );
}

export function CodeIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16"
      ></path>
    </svg>
  );
}

export function BookmarkIcon(props: PropsOf<"svg">, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
      ></path>
    </svg>
  );
}

export function PanelIcon(props: PropsOf<"svg">, key: string) {
    return (
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  viewBox="0 96 960 960"
  {...props}
  key={key}
>
  <path
    fill="currentColor"
    d="M200 936q-33 0-56.5-23.5T120 856V296q0-33 23.5-56.5T200 216h560q33 0 56.5 23.5T840 296v560q0 33-23.5 56.5T760 936H200Zm360-80V296H200v560h360Z"
  />
</svg>
    );
  }


