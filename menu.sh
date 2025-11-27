#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color



show_menu() {
    clear
    echo -e "${CYAN}    ████████╗ ██████╗ ███╗   ███╗██████╗ ${MAGENTA}    ██████╗ ██╗ ██████╗██╗  ██╗███████╗███████╗${NC}"
    echo -e "${CYAN}    ╚══██╔══╝██╔═══██╗████╗ ████║██╔══██╗${MAGENTA}    ██╔══██╗██║██╔════╝██║  ██║██╔════╝██╔════╝${NC}"
    echo -e "${CYAN}       ██║   ██║   ██║██╔████╔██║██████╔╝${MAGENTA}    ██████╔╝██║██║     ███████║█████╗  ███████╗${NC}"
    echo -e "${BLUE}       ██║   ██║   ██║██║╚██╔╝██║██╔══██╗${YELLOW}    ██╔══██╗██║██║     ██╔══██║██╔══╝  ╚════██║${NC}"
    echo -e "${BLUE}       ██║   ╚██████╔╝██║ ╚═╝ ██║██████╔╝${YELLOW}    ██║  ██║██║╚██████╗██║  ██║███████╗███████║${NC}"
    echo -e "${BLUE}       ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═════╝ ${YELLOW}    ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝${NC}"
    echo ""
    echo -e "${GREEN}                           🎰 Automated Testing Framework 🎰${NC}"
    echo ""
    echo -e "${GREEN}1)${NC} Install Dependencies"
    echo -e "${GREEN}2)${NC} Pull latest updates from Git"
    echo -e "${GREEN}3)${NC} Run Smoke tests"
    echo -e "${GREEN}4)${NC} Install Playwright browsers"
    echo -e "${GREEN}5)${NC} Open Playwright Test UI"
    echo -e "${GREEN}6)${NC} Exit"
    echo -e "${CYAN}============================${NC}"
    echo -n "Please choose an option [1-6]: "
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

open_test_ui() {
    echo -e "${YELLOW}Opening Playwright Test UI...${NC}"
    npx playwright test --ui
    read -p "Press [Enter] to continue..."
}


while true; do
show_menu
read choice

case $choice in
        1) install_dependencies ;;
        2) pull_latest ;;
        3) run_smoke_tests ;;
        4) install_browsers ;;
        5) open_test_ui ;;
        6) echo -e "${MAGENTA}Exiting...${NC}"; exit 0 ;;
        *) echo -e "${RED}Invalid option. Please try again.${NC}" ;;
    esac
done
