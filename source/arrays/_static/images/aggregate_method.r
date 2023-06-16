png("aggregate_method.png", height=15, width=20, units="cm", res=200);

cost <- function(x) { (3*x - 2) / x };
sizes <- seq(1, 50)

plot(sizes,
     sapply(sizes, cost),
     xlab="Insertions",
     ylab="Aggregated Cost (time)",
     ylim=c(1, 3.5),
     type="l",
     col="darkred",
     lwd=2);

abline(h=3,
       lty=2,
       col="black");

legend("topleft",
       expression(frac(3*x - 2, x)),
       cex = 0.8,
       lty= 1,
       col ="darkred",
       box.lty=0);

dev.off();
