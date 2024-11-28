import React, { createContext, useState, useContext } from 'react';

// Créer un contexte pour le thème
const ThemeContext = createContext<ThemeProps>({
    isDarkMode: false,
    toggleTheme: () => null
});

// Créer un hook personnalisé pour accéder au contexte
export const useTheme: () => ThemeProps = () => useContext<ThemeProps>(ThemeContext);

interface Props {
    children: JSX.Element;
}

interface ThemeProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

// Fournisseur pour envelopper l'application
export const ThemeProvider = ({ children }: Props) => {
    const [isDarkMode, setIsDarkMode] = useState(false); // Valeur initiale du mode clair

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode); // Inverse le mode actuel
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
