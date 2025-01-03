import { ToolItemProps } from "./components/dashboard/tool-items";

export const MAX_FREE_COUNTS = 100;
export const THEME_MODES = [
    {value: "light",
    label: "Light"
    },
    {value: "dark",
    label: "Dark"
    }
];
export const TOOLS: ToolItemProps[]= [
    {
        title: "Conversation",
        icon: "/icons/conversation.svg",
        url: "/conversation",
        color: "bg-blue-500",
        slug: "conversation"
      },
      {
        title: "Photo generation",
        icon: "/icons/photo.svg",
        url: "/photo",
        color: "bg-violet-500",
        slug: "photo"
      },
      // {
      //   title: "Video generation",
      //   icon: "/icons/video.svg",
      //   url: "/video",
      //   color: "bg-amber-500",
      //   slug: "video"
      // },
      // {
      //   title: "Audio generation",
      //   icon: "/icons/audio.svg",
      //   url: "/audio",
      //   color: "bg-orange-500",
      //   slug: "audio"
      // },
      {
        title: "Code generation",
        icon: "/icons/code.svg",
        url: "/code",
        color: "bg-green-500",
        slug: "code"
      },
    ];

export const NAVIGATION = [
    {title: "Dashboard",
    icon: "/icons/dashboard.svg",
    url:"/dashboard",
    slug: "dashboard"},
    ...TOOLS
]

export const DAY_IN_MS = 86_400_000;

export const PHOTO_AMOUNT_OPTIONS = [
  {
    value:"1",
    label: "1 Photo"
  },
  {
    value:"2",
    label: "2 Photo"
  },
  {
    value:"3",
    label: "3 Photo"
  },
  {
    value:"4",
    label: "4 Photo"
  },
  {
    value:"5",
    label: "5 Photo"
  }
]

export const PHOTO_RESOLUTION_OPTIONS = [
  {
    value: "256x256",
    label: "256x256"
  },
  {
    value: "512x512",
    label: "512x512"
  },
  {
    value: "1024x1024",
    label: "1024x1024"
  }
]