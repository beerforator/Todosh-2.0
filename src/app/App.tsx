import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppRouter } from "./providers/router/AppRouter"
import { LocalStorageSync } from "@/features/LocalStorageSync/LocalStorageSync";
import { useSelector } from "react-redux";
import { RootState } from "./providers/store/types";
import { useMemo } from "react";

const getDesignTokens = (mode: 'light' | 'dark', gradient: string) => ({
    palette: {
        mode, // 'light' или 'dark' - MUI сам сделает магию!
        primary: {
            main: '#2962FF',
        },
        background: {
            // default: mode === 'light' ? '#E6E7ED' : '#121212', // Разные фоны
            // paper: mode === 'light' ? '#ECF0F3' : '#1E1E1E',
        },
        text: {
            primary: mode === 'light' ? '#343A40' : '#ffffff',
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
        h4: {
            fontWeight: 600,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                div {
                    margin: 0;
                    padding: 0;
                }

                p {
                    margin: 0;
                    padding: 0;
                }

                :root {
                    --backgroundGradient: ${gradient};
                    
                    --textColor: ${mode === 'light' ? '#050711' : '#ffffff'};
                }

                body {
                    background: var(--backgroundGradient) !important;
                    background-attachment: fixed !important;
                    color: var(--textColor) !important;
                    
                    transition: background 3.3s ease, color 0.3s ease;
                }
            `,
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    position: 'absolute'
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    color: 'none'
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    width: "200px",
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    width: "200px",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    width: 0,
                    height: 0
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    margin: 0,
                    paddingRight: "8px",
                    minWidth: 0,
                    width: '100%',
                    borderRadius: '8px',
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#E0E8EF',
                    borderWidth: 0
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    width: '30px',
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
    },
});

function App() {
    const settings = useSelector((state: RootState) => state.settings);

    // 2. Создаем тему "на лету", когда mode меняется
    const theme = useMemo(() =>
        createTheme(getDesignTokens(settings.theme, settings.backgroundGradient)),
        [settings.theme, settings.backgroundGradient]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <LocalStorageSync />
            <AppRouter />
        </MuiThemeProvider>
    )
}

const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
        h4: {
            fontWeight: 600,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                div {
                    margin: 0;
                    padding: 0;
                }

                p {
                    margin: 0;
                    padding: 0;
                }
            `,
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    position: 'absolute'
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    color: 'none'
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    width: "200px",
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    width: "200px",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    width: 0,
                    height: 0
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    margin: 0,
                    paddingRight: "8px",
                    minWidth: 0,
                    width: '100%',
                    borderRadius: '8px',
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#E0E8EF',
                    borderWidth: 0
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    width: '30px',
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
    },
});

export default App
