import { useTheme } from '@mui/material/styles';
import ZodoptLogo from "../assets/images/Zodopt.png"

const Logo = () => {
  const theme = useTheme();

  return (
    <div>
      <img src={ZodoptLogo} alt="" style={{ height: 55, width: 150 }} />
    </div>
  );
};

export default Logo;
