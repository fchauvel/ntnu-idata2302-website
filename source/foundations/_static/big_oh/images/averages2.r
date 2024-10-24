require("svglite");

svglite::svglite(filename = "averages2.svg", width = 6, height = 5);

classical <- function (n) { 6*n + 4}
online <- function (n) {(n^2+9*n+6)/2}

sizes <- seq(1, 50);

plot(sizes, sapply(sizes, classical),
     col="blue",
     type="l",
     xlab="Input size $n$",
     ylab="Efficiency (runtime)");

lines(sizes, sapply(sizes, online),
      col="darkgreen",
      type="l",
      lty=2);


grid(nx = NULL,
     ny = NULL,
     lty = 3,      # Grid line type
     col = "gray", # Grid line color
     lwd = 1);


marker <- 20;
abline(v=marker, col="black");
points(x=marker, y=classical(marker), col="blue", pch=18);
points(x=marker, y=online(marker), col="darkgreen", pch=18);


legend(
    "bottomright",
    inset=0.05,
    legend=c("classical", "online"),
    box.lty=0,
    col=c("blue", "darkgreen"),
    lty=c(1,2)
);


dev.off();
