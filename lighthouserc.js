module.exports = {
  ci: {
    collect: {
      url: [
        "https://www.surgex.pt",
        "https://www.surgex.pt/en",
        "https://www.surgex.pt/pt"
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
