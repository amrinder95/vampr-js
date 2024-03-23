class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  //Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let checkVampire = this;
    while (checkVampire.creator) {
      checkVampire = checkVampire.creator
      count++;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if(this.numberOfVampiresFromOriginal === 0) { //if called on root
      return this;
    }
    if(vampire.numberOfVampiresFromOriginal === 0) { //if called with root
      return vampire;
    }
    if(this.creator.name === vampire.creator.name && this.name !== vampire.name) { //if called on 2 siblings
      return this.creator;
    }
    if (this.name === vampire.name) { //if called on itself
      return this;
    }
    if (vampire.name === this.creator.name) { //if called with direct ancestor
      return vampire;
    }
    if (vampire.creator.name === this.name) { //if called on direct ancestor
      return this;
    } 
    if(this.isMoreSeniorThan(vampire)) {
      let currentVampire = vampire;
      while(currentVampire.creator) {
        currentVampire = currentVampire.creator
        if (!this.isMoreSeniorThan(currentVampire)) {
          let currentVampire2 = this;
          if(currentVampire.creator.name === currentVampire2.creator.name) {
            return currentVampire.creator;
          }
          while(currentVampire.creator || currentVampire2.creator) {
            currentVampire = currentVampire.creator;
            currentVampire2 = currentVampire2.creator;
            if(currentVampire.creator.name === currentVampire2.creator.name) {
              return currentVampire.creator;
            }
          }
        }
      }
    } else {
      let currentVampire = this;
      while(currentVampire.creator) {
        currentVampire = currentVampire.creator
        if(!vampire.isMoreSeniorThan(currentVampire)) {
          let currentVampire2 = vampire;
          if(currentVampire.creator.name === currentVampire2.creator.name) {
            return currentVampire.creator;
          }
          while (currentVampire.creator || currentVampire2.creator) {
            currentVampire = currentVampire.creator;
            currentVampire2 = currentVampire2.creator;
            if(currentVampire.creator.name === currentVampire2.creator.name) {
              return currentVampire.creator;
            }
          }
        }
      }
    }
  }
}

module.exports = Vampire;
