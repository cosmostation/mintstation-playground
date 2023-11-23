import PropTypes from "prop-types";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import { Box, IconButton, Stack, SvgIcon, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

type ITopNavProps = {
  onNavOpen: any;
};

export const TopNav = (props: ITopNavProps) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <>
      {!lgUp && (
        <Box
          component="header"
          sx={{
            backdropFilter: "blur(6px)",
            backgroundColor: (theme: any) =>
              alpha(theme.palette.background.default, 0.8),
            position: "sticky",
            left: {
              lg: `${SIDE_NAV_WIDTH}px`,
            },
            top: 0,
            width: {
              lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
            },
            zIndex: (theme) => theme.zIndex.appBar,
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              minHeight: TOP_NAV_HEIGHT,
              px: 2,
            }}
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};
