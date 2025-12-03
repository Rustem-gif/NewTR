#!/bin/bash

# Change to script directory to ensure npm commands work
cd "$(dirname "$0")" || exit

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color



show_menu() {
    clear
    
    # Get terminal width
    TERM_WIDTH=$(tput cols)
    
    # Show appropriate banner based on terminal width
    if [ "$TERM_WIDTH" -ge 95 ]; then
        # Full banner for wide terminals
        echo -e "${CYAN}    ████████╗ ██████╗ ███╗   ███╗██████╗ ${MAGENTA}    ██████╗ ██╗ ██████╗██╗  ██╗███████╗███████╗${NC}"
        echo -e "${CYAN}    ╚══██╔══╝██╔═══██╗████╗ ████║██╔══██╗${MAGENTA}    ██╔══██╗██║██╔════╝██║  ██║██╔════╝██╔════╝${NC}"
        echo -e "${CYAN}       ██║   ██║   ██║██╔████╔██║██████╔╝${MAGENTA}    ██████╔╝██║██║     ███████║█████╗  ███████╗${NC}"
        echo -e "${BLUE}       ██║   ██║   ██║██║╚██╔╝██║██╔══██╗${YELLOW}    ██╔══██╗██║██║     ██╔══██║██╔══╝  ╚════██║${NC}"
        echo -e "${BLUE}       ██║   ╚██████╔╝██║ ╚═╝ ██║██████╔╝${YELLOW}    ██║  ██║██║╚██████╗██║  ██║███████╗███████║${NC}"
        echo -e "${BLUE}       ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═════╝ ${YELLOW}    ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝${NC}"
        echo ""
        echo -e "${GREEN}                           🎰 Automated Testing Framework 🎰${NC}"
    elif [ "$TERM_WIDTH" -ge 60 ]; then
        # Compact banner for medium terminals - smaller version of full banner
        echo -e "${CYAN}████████╗ ██████╗ ███╗   ███╗██████╗ ${MAGENTA} ██████╗ ██╗ ██████╗██╗  ██╗███████╗███████${NC}"
        echo -e "${CYAN}╚══██╔══╝██╔═══██╗████╗ ████║██╔══██╗${MAGENTA} ██╔══██╗██║██╔════╝██║  ██║██╔════╝██╔════${NC}"
        echo -e "${CYAN}   ██║   ██║   ██║██╔████╔██║██████╔╝${MAGENTA} ██████╔╝██║██║     ███████║█████╗  ███████${NC}"
        echo -e "${BLUE}   ██║   ██║   ██║██║╚██╔╝██║██╔══██╗${YELLOW} ██╔══██╗██║██║     ██╔══██║██╔══╝  ╚════██${NC}"
        echo -e "${BLUE}   ██║   ╚██████╔╝██║ ╚═╝ ██║██████╔╝${YELLOW} ██║  ██║██║╚██████╗██║  ██║███████╗███████${NC}"
        echo -e "${BLUE}   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═════╝ ${YELLOW} ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════${NC}"
        echo ""
        echo -e "${GREEN}      🎰 Test Framework 🎰${NC}"
    else
        # Minimal banner for narrow terminals
        echo -e "${GREEN}🎰 TOMB RICHES Tests${NC}"
        echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━${NC}"
    fi
    echo ""
    echo -e "${GREEN}1)${NC} Install Dependencies"
    echo -e "${GREEN}2)${NC} Pull latest updates from Git"
    echo -e "${GREEN}3)${NC} Install Playwright browsers"
    echo -e "${GREEN}4)${NC} Open Playwright Test UI"
    echo -e "${MAGENTA}5)${NC} Run Tests ➜  ${CYAN}Test menu${NC}"
    echo -e "${GREEN}6)${NC} Exit"
    echo -e "${CYAN}============================${NC}"
    echo -n "Please choose an option [1-6]: "
}


show_test_menu() {
    clear
    
    # Get terminal width for adaptive layout
    TERM_WIDTH=$(tput cols)
    
    if [ "$TERM_WIDTH" -ge 80 ]; then
        # Full fancy box for wider terminals
        echo -e "${MAGENTA}┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓${NC}"
        echo -e "${MAGENTA}┃${CYAN}   🧪  TEST SANCTUARY · AUTOMATED QUALITY GATEWAY  🧪                 ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${CYAN}      Smoke, regression & rituals for bug exorcism 🔥                  ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[1]${NC} Run Smoke Tests            ${YELLOW}⚡ Fast health check${NC}                  ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[2]${NC} Run Deposit Tests (Windows) ${BLUE}📦 Payment flows (Win)${NC}              ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${GREEN}[3]${NC} Run Deposit Tests (Mac)     ${BLUE}📦 Payment flows (Mac)${NC}              ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┃${NC}  ${YELLOW}[0]${NC} Back to Main Menu          ${CYAN}🏠 Return to control center${NC}          ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫${NC}"
        echo -e "${MAGENTA}┃${NC}  ${CYAN}💡 Tip: Keep an eye on logs, not just the green checks${NC}              ${MAGENTA}┃${NC}"
        echo -e "${MAGENTA}┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛${NC}"
    else
        # Simplified menu for narrower terminals
        echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${CYAN}  🧪  TEST MENU${NC}"
        echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "  ${GREEN}[1]${NC} Run Smoke Tests            ${YELLOW}⚡${NC}"
        echo -e "  ${GREEN}[2]${NC} Run Deposit Tests (Windows) ${BLUE}📦${NC}"
        echo -e "  ${GREEN}[3]${NC} Run Deposit Tests (Mac)     ${BLUE}📦${NC}"
        echo -e "  ${YELLOW}[0]${NC} Back to Main Menu          ${CYAN}🏠${NC}"
        echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    fi
    echo ""
    echo -n "Please choose an option [0-3]: "
}


install_dependencies() {
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
    npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Dependencies installed successfully!${NC}"
else
    echo -e "${RED}Failed to install dependencies.${NC}"
fi
read -p "Press [Enter] to continue..."
}

pull_latest() {
    echo -e "${YELLOW}Pulling latest updates from Git...${NC}"
    git pull origin main
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Successfully pulled latest updates!${NC}"
    else
        echo -e "${RED}Failed to pull updates from Git.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

install_browsers() {
    echo -e "${YELLOW}Installing Playwright browsers...${NC}"
    npx playwright install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Playwright browsers installed successfully!${NC}"
    else
        echo -e "${RED}Failed to install Playwright browsers.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_smoke_tests() {
    echo -e "${YELLOW}Running Smoke tests...${NC}"
    npm run test:smoke
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Smoke tests completed successfully!${NC}"
    else
        echo -e "${RED}Some Smoke tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_dep_test_windows() {
    echo -e "${YELLOW}Running Deposit Method tests...${NC}"
    npm run test:dep-win
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Deposit Method tests completed successfully!${NC}"
    else
        echo -e "${RED}Some Deposit Method tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

run_dep_test_mac() {
    echo -e "${YELLOW}Running Deposit Method tests...${NC}"
    npm run test:dep-mac
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Deposit Method tests completed successfully!${NC}"
    else
        echo -e "${RED}Some Deposit Method tests failed.${NC}"
    fi
    read -p "Press [Enter] to continue..."
}

open_test_ui() {
    echo -e "${YELLOW}Opening Playwright Test UI...${NC}"
    npx playwright test --ui
    read -p "Press [Enter] to continue..."
}


test_menu_loop() {
    while true; do
        show_test_menu
        read test_choice
        
        case $test_choice in
            1) run_smoke_tests ;;
            2) run_dep_test_windows ;;
            3) run_dep_test_mac ;;
            0) return ;; # Return to main menu
            *) 
                echo -e "${RED}Invalid option. Please try again.${NC}"
                sleep 2
                ;;
        esac
    done
}

while true; do
show_menu
read choice

case $choice in
        1) install_dependencies ;;
        2) pull_latest ;;
        3) open_test_ui ;;
        4) install_browsers ;;
        5) test_menu_loop ;;
        6) echo -e "${MAGENTA}Exiting...${NC}"; exit 0 ;;
        *) echo -e "${RED}Invalid option. Please try again.${NC}" ;;
    esac
done
