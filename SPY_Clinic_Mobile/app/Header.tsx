import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import LogoutButton from "../components/Logout";
import ThemeToggle from "../components/ThemeToggle";
import { useAuthStore } from "../context/Auth";

// design-system.md §1.2/1.3 — Header sobre `surface`, sin hex inventados.
//
// A 360px el header no cabe con todo visible: título (118) + toggle (52) +
// avatar (48) + nombre/rol (85) + logout con texto (129) = 432px de
// contenido contra 328px disponibles. Por debajo de COMPACT_BREAKPOINT se
// colapsa el bloque de identidad y el logout pasa a botón-icono 44px
// (270px), y el título se recorta con `numberOfLines` como red de seguridad:
// con `flex-shrink` el header nunca desborda, solo se degrada.

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

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 1;
  min-width: 0;
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
        <Title numberOfLines={1}>Psicólogos UI</Title>

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
