FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

RUN apt-get update && apt-get install curl -y
RUN curl "https://raw.githubusercontent.com/microsoft/vscode-dev-containers/master/script-library/common-debian.sh" > common-debian.sh

# Options for setup script
ARG INSTALL_ZSH="true"
ARG UPGRADE_PACKAGES="false"
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN bash ./common-debian.sh
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get update && apt-get install nodejs -y