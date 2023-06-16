#  Generate a view of the capacity of an array that grow by two

MAX <- 35;

data <- matrix(ncol = MAX, nrow = 6);
rownames(data) <- c("length", "capacity", "insertion", "resizing", "extra", "bank");

cost <- 1;
length <- 0;
capacity <- 2;
step <- 0;
extra <- 2;
bank <- 0;
while (step < MAX) {
    data[1, step+1] <- length;
    data[2, step+1] <- capacity - length;
    data[3, step+1] <- 1;
    data[4, step+1] <- if (capacity == length) length else 0;
    data[5, step+1] <- extra;
    data[6, step+1] <- bank;
    bank <- if (length == capacity) bank - length + extra else bank + extra;
    if (length >= capacity) {
        capacity <- capacity * 2;
    }
    length <- length + 1;
    step <- step + 1;
}

show(data);

png("banker.png", height=20, width=18, units="cm", res=200);

par(mfrow=c(2,1))

barplot(data[c(3,4,5),],
        names.arg=data[1,],
        xlab="Insertions",
        ylab="Cost",
        col=c("orange", "darkred", "lightblue"));

legend("topleft",
       c("insertion", "resizing", "saving"),
       cex = 0.8,
       fill = c("orange", "darkred", "lightblue"),
       box.lty=0);

barplot(data[6,],
        names.arg=data[1,],
        xlab="Insertions",
        ylab="",
        col=c("lightgreen"));

legend("topleft",
       c("accumulated savings"),
       cex = 0.8,
       fill = c("lightgreen"),
       box.lty=0);

dev.off();
