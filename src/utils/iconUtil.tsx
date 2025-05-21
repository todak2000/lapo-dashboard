import {
  AccountIcon,
  BlockIcon,
  BranchIcon,
  CardIcon,
  DashboardIcon,
  ListIcon,
  ProfileIcon,
  QueueIcon,
  RequestIcon,
  RoleIcon,
  SchemeIcon,
  StockIcon,
  TrailIcon,
  UserIcon,
} from "../components/icons";
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "dashboard":
      return <DashboardIcon />;
    case "branches":
      return <BranchIcon />;
    case "roles":
      return <RoleIcon />;
    case "users":
      return <UserIcon />;
    case "scheme":
      return <SchemeIcon />;
    case "profile":
      return <ProfileIcon />;
    case "request":
      return <RequestIcon />;
    case "stock":
      return <StockIcon />;
    case "block":
      return <BlockIcon />;
    case "list":
      return <ListIcon />;
    case "queue":
      return <QueueIcon />;
    case "trail":
      return <TrailIcon />;
    case "account":
      return <AccountIcon />;
    case "cards":
      return <CardIcon />;
    default:
      return (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
};

export { getIcon };
