import { Link, usePathname } from "expo-router";
import styled from "styled-components/native";

const NAV_ITEMS: { href: any; label: string }[] = [
  { href: "/home", label: "Inicio" },
  { href: "/paciente", label: "Paciente" },
  { href: "/turnos", label: "Turnos" },
  { href: "/ListaTurnos", label: "Lista Turnos" },
  { href: "/Psicologo", label: "Psicólogo" },
  { href: "/PlanTurno", label: "Plan Turno" },
  { href: "/Consultorio", label: " Consultorio" },
  { href: "/DashBoard", label: " Asistencia" },
];

const NavBar = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  elevation: 4;
`;

const NavScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
`;

const NavPress = styled.Pressable<{ $active: boolean }>`
  min-height: 44px;
  min-width: 44px;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  margin-horizontal: 2px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, $active }) =>
    $active ? theme.colors.actionPrimary : "transparent"};
`;

const NavLabel = styled.Text<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  text-align: center;
`;

function Nav() {
  const pathname = usePathname();

  return (
    <NavBar>
      <NavScroll
        contentContainerStyle={{ paddingHorizontal: 8, alignItems: "center" }}
      >
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} asChild>
              <NavPress
                $active={active}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: active }}
              >
                <NavLabel $active={active}>{item.label}</NavLabel>
              </NavPress>
            </Link>
          );
        })}
      </NavScroll>
    </NavBar>
  );
}

export default Nav;
