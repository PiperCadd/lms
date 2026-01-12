"use client";

import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type AccordionItem = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode | string[];
  disabled?: boolean;
};

type ControlledAccordionProps = {
  items: AccordionItem[];
  defaultExpandedId?: string;
  onChange?: (id: string | false) => void;
};

export default function ControlledAccordion({
  items,
  defaultExpandedId = false,
  onChange,
}: ControlledAccordionProps) {
  const [expanded, setExpanded] = React.useState<string | false>(
    defaultExpandedId
  );

  const handleChange =
    (id: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      const value = isExpanded ? id : false;
      setExpanded(value);
      onChange?.(value);
    };

  const renderContent = (content: AccordionItem["content"]) => {
    if (Array.isArray(content)) {
      return (
        <List
          sx={{
            border: "1px solid var(--border-color)",
            // borderRadius: 1,
            padding: 0,
            "&.MuiList-root": {
              padding: 0,
            },
          }}
        >
          {content.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                padding: "8px 12px",
                borderBottom:
                  index !== content.length - 1
                    ? "1px solid var(--border-color)"
                    : "none",
              }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  margin: 0,
                }}
                sx={{
                  margin: 0,
                }}
              />
            </ListItem>
          ))}
        </List>
      );
    }

    return content;
  };

  return (
    <>
      {items.map((item, index) => {
        const isFirst = index === 0;

        return (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
            disabled={item.disabled}
            disableGutters
            sx={{
              boxShadow: "none",
              backgroundColor: "transparent",
              border: "1px solid var(--border-color)",
              marginBottom: 1, // GAP BETWEEN ACCORDIONS
              "&.Mui-expanded": {
                marginBottom: 1, // KEEP GAP WHEN EXPANDED
                marginTop: 0,
                backgroundColor: "transparent",
              },

              "&::before": {
                display: "none",
              },
              /* FIRST ACCORDION */
              "&:first-of-type": {
                // borderTopLeftRadius: "var(--border-radius-md)",
                // borderTopRightRadius: "var(--border-radius-md)",

                /* APPLY TO SUMMARY */
                // "& .MuiAccordionSummary-root": {
                //   borderTopLeftRadius: "var(--border-radius-md)",
                //   borderTopRightRadius: "var(--border-radius-md)",
                // },
              },
              // ...(isFirst && {
              //   borderRadius:
              //     "var(--border-radius-md) var(--border-radius-md) 0 0",
              // }),
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: "var(--admin-light-blue)",
                minHeight: 48,

                "&.Mui-expanded": {
                  minHeight: 48,
                },

                // ...(isFirst && {
                //   borderRadius:
                //     "var(--border-radius-md) var(--border-radius-md) 0 0",
                // }),
              }}
            >
              {typeof item.title === "string" ? (
                <Typography fontWeight={500}>{item.title}</Typography>
              ) : (
                item.title
              )}
            </AccordionSummary>

            <AccordionDetails
              sx={{
                padding: 2,
                backgroundColor: "transparent",
                color: "var(--admin-text-white)",

                "& .MuiTypography-root": {
                  color: "var(--text-primary)",
                },

                "& .MuiListItemText-primary": {
                  color: "var(--text-primary)",
                },

                "& ul, & ol": {
                  margin: 0,
                  paddingLeft: 2,
                },
              }}
            >
              {renderContent(item.content)}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
