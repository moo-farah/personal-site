import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const lightWash = `
  radial-gradient(ellipse 90% 55% at 50% -15%, rgba(255,255,255,0.95), transparent 58%),
  radial-gradient(ellipse 70% 50% at 50% 100%, rgba(180,170,155,0.18), transparent 55%)
`;

const darkWash = `
  radial-gradient(ellipse 80% 40% at 50% -10%, rgba(255,255,255,0.08), transparent 50%),
  radial-gradient(ellipse 70% 50% at 50% 110%, rgba(0,0,0,0.45), transparent 55%)
`;

export const Layout = ({ children }: LayoutProps) => {
  const { currentTheme, isDarkMode } = useTheme();

  return (
    <div
      className="relative min-h-screen transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg.primary }}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundColor: currentTheme.bg.primary,
          backgroundImage: isDarkMode ? darkWash : lightWash,
        }}
        aria-hidden
      />
      <div className="site-grain pointer-events-none fixed inset-0 -z-10" aria-hidden />
      {children}
    </div>
  );
};
