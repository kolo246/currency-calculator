<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at --plan
<!-- SPECKIT END -->

## Mock Mode Configuration

This project supports a local mock mode for development without an external API key or network connectivity.

### Environment Variables

- `VITE_USE_MOCK_DATA`: Set to `true` to force mock mode even if an API key is present.
- `VITE_EXCHANGE_RATE_API_KEY`: If missing or set to `YOUR_API_KEY`, the app will automatically fall back to mock mode.

### Behavior

- **Production Safety**: Mock data and its service logic are code-split and excluded from the main production bundle via dynamic imports.
- **Cache Isolation**: Mock data bypasses the `localStorage` cache to prevent data pollution.
- **UI Indicator**: A "Mock Mode" badge appears in the results card when simulated data is active.
