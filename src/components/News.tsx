import {Box, Stack} from "@mui/material";

type NewsProps = {
    title: string;
    url: string;
    descendants: number;
    date: number;
    by: string;
}

export const News = ({ title, url, descendants, date, by }: NewsProps) => {
    return (
        <Stack>
            <Box>
                <span>{title}</span>
                <span>News original: <a>{url}</a></span>
            </Box>
            <Box>
                <span>By: {by}</span>
                <span>Date published: {date}</span>
            </Box>
            <Box>
                <span>Total comments: {descendants}</span>
            </Box>
        </Stack>
    )
};