import { formatDecimal } from "@/functions/stringFunctions";
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

type IDashboardCardProps = {
  title: string;
  value: number;
};

export const DashboardCard = ({ title, value }: IDashboardCardProps) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            <Typography variant="h4">
              {formatDecimal(value, 6, 2)} MINT
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
