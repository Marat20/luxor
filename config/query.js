export const getMakers = (makers) => `{
    getTokenEvents(direction: ASC, query:{ address: "${makers.wallet}", networkId: 1, timestamp: {from:${makers.startTransaction}, to: ${makers.finishTransaction}}}, limit: 100) {
      items {
        maker
      }
      }
    }`;
