# setup-age-action

Install [aɡe̞](https://github.com/FiloSottile/age) in your github action
to support encrypting files

## Example

```yaml
      - uses: RobotsAndPencils/setup-age-action@v1.0.0

      - name: Package Logs
        id: package_logs
        if: always()
        run: |
          age --recipients <recipients> --output logs.tar.gz.age logs.tar.gz
```

### Security and Public Use Statement

This repository is a public utility designed for use in GitHub Actions workflows, similar to other GitHub Actions in the ecosystem.

### What This Action Does

This is a utility GitHub Action that downloads and installs the [age](https://github.com/FiloSottile/age) encryption tool from the official [FiloSottile/age](https://github.com/FiloSottile/age) repository releases. It functions similarly to official GitHub setup actions like `actions/setup-node` or `actions/setup-python` - it simply provides a convenient way to install a tool in GitHub Actions workflows.

### What This Repository Does NOT Contain

This repository contains **no sensitive or proprietary information**:

- **No customer data** - This action does not process, store, or transmit any customer data
- **No encryption keys, secrets, or credentials** - The action does not contain any keys or secrets. Encryption keys are managed separately by the repositories that use this action
- **No API keys or tokens** - No API credentials or authentication tokens are stored in this repository
- **No proprietary or sensitive business logic** - The action only downloads the official `age` binary and adds it to the PATH

### How It Works

This action performs the following steps:

1. Downloads the official `age` binary from the [FiloSottile/age releases](https://github.com/FiloSottile/age/releases)
2. Extracts and caches the binary using GitHub Actions' tool cache
3. Adds the binary to the runner's PATH so it can be used in subsequent workflow steps

The action does not perform any encryption or decryption operations itself - it only installs the tool. All encryption/decryption operations are performed by the consuming repository's workflows using their own keys and secrets.

### Usage in Private Repositories

This action is designed to be used by both public and private repositories. When used by private repositories (such as internal CI/CD workflows):

- The consuming repository handles all encryption keys and secrets securely via GitHub Secrets
- This action only provides the `age` tool - it does not have access to any keys or secrets
- The consuming repository is responsible for securely managing their own encryption keys and recipient information
- No data flows back to this repository - it is a one-way dependency

