import { Heading, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Layout({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) {
  return (
    <div>
      <Box
        p={5}
        bg="green.400"
        shadow="
                2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
                6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
                12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
                22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
                41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
                100px 100px 80px rgba(0, 0, 0, 0.07)
              ;"
      >
        <Link to="/">
          <Heading color="white">Utilities</Heading>
        </Link>
      </Box>
      {children}
    </div>
  );
}

export default Layout;
