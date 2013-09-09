Gettin' Philoslothical about JS

In javascript, functions are objects with the weird property that they can also take input.

Maybe it is more healthy to think of Objects and Functions as both implementations of some primitive that can possibly accept input and has properties. We could call this primitive an Actor:

    struct Actor {
      func f
      props ...map[string]interface{}
    }
