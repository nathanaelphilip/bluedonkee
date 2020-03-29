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
                  SUBSTITUTE(
                    SUBSTITUTE(TRIM(Title),"-",""),
                  "'",""),
                ",",""),
              "|",""),
            "/", ""),
          ")", ""),
        "(", ""),
      ".", ""),
    ":", ""),
  " ","-")
)
