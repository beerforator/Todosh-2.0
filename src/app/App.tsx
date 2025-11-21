import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppRouter } from "./providers/router/AppRouter"

function App() {
    console.log('Render App')
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
        </MuiThemeProvider>
    )
}

const theme = createTheme({
    // Здесь мы можем задавать глобальные переменные для MUI
    // palette: {
    //     primary: {
    //         main: '#193173', // Наш основной синий
    //     },
    //     background: {
    //         // default: '#E6E7ED', // Наш фон
    //         // paper: '#ECF0F3',   // Фон для "бумажных" элементов (карточки, сайдбар)
    //     }
    // },
    typography: {
        // ЗАДАЕМ ШРИФТ ДЛЯ ВСЕГО ПРИЛОЖЕНИЯ
        fontFamily: [
            // '-apple-system',
            'Roboto',
            // 'BlinkMacSystemFont',
            // '"Segoe UI"',
            // '"Helvetica Neue"',
            // 'Arial',
            'sans-serif',
        ].join(','),
        // Можно задать размеры для h1, h2, body1 и т.д.
        h4: {
            fontWeight: 600,
        },
    },
    // spacing: 8,
    // 2. А ЗДЕСЬ - ГЛОБАЛЬНО ПЕРЕОПРЕДЕЛЯЕМ СТИЛИ КОМПОНЕНТОВ
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
        // Переопределяем ВСЕ ListItemButton
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
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
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
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
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
                    margin: 0,
                    padding: 0,
                    width: "200px",
                    // overflow: "hidden",
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
                    margin: 0,
                    padding: 0,
                    width: "200px",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
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
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
                    margin: 0,
                    padding: 0,
                    minWidth: 0
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
                    margin: 0,
                    padding: 0,
                    // minWidth: 0
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    // borderRadius: '8px',
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
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
        // MuiNotchedOutlined: {
        //     styleOverrides: {
        //         root: {
        //             // borderRadius: '8px',
        //             // Добавляем !important для гарантии
        //             // margin: '4px 0 !important',
        //             // padding: '8px 16px !important',
        //             margin: 0,
        //             // paddingRight: "10px",
        //             minWidth: 0,
        //             borderRadius: '8px',
        //             outline: 'none',
        //             border: 'none',
        //             backgroundColor: '#E0E8EF',
        //             borderWidth: 0
        //         },
        //     },
        // },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    // Добавляем !important для гарантии
                    // margin: '4px 0 !important',
                    // padding: '8px 16px !important',
                    margin: 0,
                    padding: 0,
                    minWidth: 0
                },
            },
        },
        // Переопределяем ВСЕ Typography
        MuiTypography: {
            styleOverrides: {
                root: {
                    margin: 0, // Можно добавить, если нужно
                    padding: 0,
                },
            },
        },
        // Можно добавить сброс для чего угодно, например, для MuiList
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
        // MuiListItemButton: {
        //     styleOverrides: {
        //         root: {
        //             margin: 0,
        //             padding: 0,
        //         },
        //     },
        // },
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
