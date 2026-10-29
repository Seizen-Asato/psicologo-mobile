import { Image, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import LogoutButton from "../components/Logout";
import ThemeToggle from "../components/ThemeToggle";
import { useAuthStore } from "../context/Auth";

const COMPACT_BREAKPOINT = 480;

const HeaderSafe = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.surface};
`;

const HeaderBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const Logo = styled(Image)`
  width: 140px;
  height: 40px;
`;

const Profile = styled.View`
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
`;

const Avatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.actionPrimary};
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const AvatarText = styled.Text`
  color: ${({ theme }) => theme.colors.onAction};
  font-weight: 700;
`;

const Info = styled.View`
  margin-right: 12px;
  flex-shrink: 1;
  min-width: 0;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
`;

const Role = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const { width } = useWindowDimensions();
  const compact = width < COMPACT_BREAKPOINT;

  const displayName = user?.name
    ? `${user.name}${user.lastName ? " " + user.lastName : ""}`
    : "Invitado";

  const initials =
    user?.name && user.name.trim() !== ""
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "??";

  return (
    <HeaderSafe edges={["top"]}>
      <HeaderBar>
        <Logo
          source={require("../assets/images/Logos/logo_con_nombre.png")}
          resizeMode="contain"
          style={{
            width: compact ? 160 : 240,
            height: compact ? 40 : 50,
          }}
        />
        <Profile>
          <ThemeToggle />
          <Avatar>
            <AvatarText>{initials}</AvatarText>
          </Avatar>
          {!compact && (
            <Info>
              <Name numberOfLines={1}>{displayName}</Name>
              <Role numberOfLines={1}>{user?.role ?? "Sin rol"}</Role>
            </Info>
          )}
          {user && <LogoutButton compact={compact} />}
        </Profile>
      </HeaderBar>
    </HeaderSafe>
  );
}
