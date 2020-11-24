module.exports = function GamesStore() {
  this.games = [];
  this.subscribers = [];
  this.sendMessages = () => {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber.readyState === 1
    );

    this.subscribers.forEach((subscriber) => {
      subscriber.send(JSON.stringify(this.games));
    });
  };
};
