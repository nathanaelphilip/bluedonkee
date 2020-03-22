# Slugs
LOWER(
  SUBSTITUTE(
    SUBSTITUTE(
      SUBSTITUTE(
        SUBSTITUTE(
          SUBSTITUTE(
            SUBSTITUTE(
              SUBSTITUTE(
                SUBSTITUTE(
                  SUBSTITUTE(Title,"-",""),
                "'",""),
              ",",""),
            "|",""),
          "/", ""),
        ")", ""),
      "(", ""),
    ".", ""),
  " ","-")
)
