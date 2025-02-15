> This question is relevant for **any project with a backend (minus chaos)**
> (Bridges, Circles, Clusters, Freerooms, Notangles, Structs, Unielectives).

# DevSoc Subcommittee Recruitment: Backend

> **YOU DO NOT NEED TO COMPLETE ALL PARTS.** 
> Complete the parts that you think best reflect your skills (feel free to do any order).

## Background

DevSoc, having cooked too hard with their projects, has decided to expand into the food industry to chef it up with their new restaurant: DevDonalds™ 😎! As their head chef, you’ve been tasked to design a system to efficiently manage their menu.

Since you're a Computer Science student, your culinary skills are unfortunately lacking, but luckily you've found a magical cookbook. It's missing some pages and written in an
unintelligible scrawl but you can make out that it's witten in `Python` and `TypeScript`. You decide to patch up the cookbook to teach yourself and your sous chefs how to cook :)

## 📖 Task 1: Chef! I can't read!

Uh oh! Unfortunately it looks like the food names have been written with abysmal handwriting 😱😱… it falls to us to make sure that they are legible for the kitchen staff to read.

For this task you should complete the `parse_handwriting()` function, that takes in a string `recipeName`, and returns the string recipe name that satisfies the following conditions:

- All hyphens (`-`) and underscores (`_`) should be replaced with a whitespace. If there are multiple occurrences all instances should be replaced.

- Food names can only contain letters and whitespaces. Any other characters should be removed (or otherwise changed as above).

  ```
  Riz@z RISO00tto! -> Rizz Risotto
  ```

- If a name is composed of multiple words (separated by a whitespace, hyphen, or underscore), the first letter of each word should be capitalised. Any other letters should be lowercase.

  ```
  "meatball -> Meatball"
  "Skibidi spaghetti -> Skibidi Spaghetti"
  "alpHa alFRedo -> Alpha Alfredo"
  ```



- There should only be **one** whitespace between words. If there are multiple whitespaces between words they should be squashed down to a singular whitespace. Leading and trailing whitespace should be removed

  ```
  "Skibidi   spaghetti" -> "Skibidi Spaghetti"
  "Skibidi spaghetti    " -> "Skibidi Spaghetti"
  "Skibidi___Spaghetti  " -> "Skibidi Spaghetti"
  ```

- The resulting string should have a length of `> 0` characters. If it doesn't satisfy this case, return `null` (or `None` in python).

If the input already satisfies all the conditions, simply return the input string.

## 🍳 Task 2: Cook or be cooked

You want to create and add more `entries` to the cookbook, but find out that it only accepts new items via an exposed **HTTP POST endpoint**. The endpoint takes a JSON request body containing a single `entry`.

All `entries` have a **name** (`str`) and a **type** discriminator (`str`) which can either be a `recipe` or `ingredient`.

Each `recipe` has additionally has `requiredItems`; a **list** of a cookbook entry names (`str`) and their required quantity (`int`). The `requiredItems` list may contain any combination of other `entries` (ie. other dishes and/or ingredients).

```json
// Example of a 'recipe' entry containing a recipe and ingredient as requiredItems
{
  "type": "recipe",
  "name": "Sussy Salad",
  "requiredItems": [
    {
      "name": "Mayonaise",
      "quantity": 1
    }
    {
      "name": "Lettuce",
      "quantity": 3
    },
  ]
}

// Example of a 'recipe' entry, only requiring a single ingredient
{
  "type": "recipe",
  "name": "Mayonaise",
  "requiredItems": [
    {
      "name": "Egg",
      "quantity": 1
    }
  ]
}
```

An `ingredient` only has an extra cookTime field (`int`), which must be greater than or equal to `0`.

```json
// Example of an 'ingredient' entry
{
  "type": "ingredient",
  "name": "Egg",
  "cookTime": 6,
}

// Example of an 'ingredient' entry
{
  "type": "ingredient",
  "name": "Lettuce",
  "cookTime": 0,
},

```


Your task for this part is to implement this endpoint and store the cookbook entries. Upon a successful operation you must return a `HTTP 200` status code and an empty response body.

If any of the following conditions are violated, the cookbook should return a `HTTP 400` status code and the entry is not added to the cookbook:

- **type** can only be "recipe" or "ingredient".
- **cookTime** can only be greater than or equal to 0
- entry **names** must be unique
- Recipe **requiredItems** can only have one element per name.

**For this task you don't need to consider if a requiredItem exists in the cookbook**

There are two template folders (python and typescript) each of them with a stub `POST /cookbookEntry` endpoint that you must implement. The input domain has already been modelled for you as types in the respective language.

## 🧑‍🍳 Task 3: Prithee... teach me how to cook

Opening a restaurant with CS students has its consequences... our sous chefs don't seem to know how to cook either :'( However, they should be very good at reading documentation right!? To make this easier for them, we want to return a summary of the recipe given it's name.

The cookbook provides a very useful **HTTP GET endpoint** that takes in one query argument: the desired recipe's **name**. 
```
/summary?name=<insert name here>
```
A recipe summary has the following fields
- **name** (`str`): The name of the recipe.
- **cookTime** (`int`): The total cooking time, which is the sum of the cookTimes of all the required ingredients.
- **ingredients** (`RequiredItem[]`): A list of only the base ingredients for the recipe. If a `RequiredItem` is itself a recipe, its ingredients should be included recursively as base ingredients.

For example, "Skibidi Spaghetti" is composed of Meatballs, Pasta, and Tomatoes: 
```json
{
  "type": "recipe",
  "name": "Skibidi Spaghetti",
  "requiredItems": [
    {
      "name": "Meatball",
      "quantity": 3
    },
    {
      "name": "Pasta",
      "quantity": 1
    },
    {
      "name": "Tomato",
      "quantity": 2
    }
  ]
},
{
  "type": "recipe",
  "name": "Meatball",
  "requiredItems": [
    {
      "name": "Beef",
      "quantity": 2
    },
    {
      "name": "Egg",
      "quantity": 1
    }
  ]
},
{
  "type": "recipe",
  "name": "Pasta",
  "requiredItems": [
    {
      "name": "Flour",
      "quantity": 3
    },
    {
      "name": "Egg",
      "quantity": 1
    }
  ]
},
{
    "type": "ingredient"
    "name": "Beef",
    "cookTime": 5
},
{
    "type": "ingredient"
    "name": "Egg",
    "cookTime": 3,
},
{
    "type": "ingredient"
    "name": "Flour",
    "cookTime": 0
},
{
    "type": "ingredient"
    "name": "Tomato",
    "cookTime": 2,
}
```

Since 'Meatball' and 'Pasta' are recipes, we should continue searching for their ingredients until we reach the base ingredients, and the resulting cookTime takes into account their quantities and individual cook times.


Searching for "Skibidi Spaghetti" will hence return the following result:

```json
{
  "name": "Skibidi Spaghetti",
  "cookTime": 46,
  "ingredients": [
    {
      "name": "Beef",
      "quantity": 6
    },
    {
      "name": "Flour",
      "quantity": 3
    },
    {
      "name": "Egg",
      "quantity": 4
    },
    {
      "name": "Tomato",
      "quantity": 2
    }
  ]
}
```

The endpoint should additionally return with status code `400` if:

- A recipe with the corresponding name cannot be found.
- The searched name is NOT a recipe name (ie. an ingredient).
- The recipe contains recipes or ingredients that aren't in the cookbook.


## Assumptions
- For cases where a `HTTP 400` status code should be returned, the autotests focus only on the correct status code being returned and do not check or consider error messages.
- Feel free to use any additional libraries, packages, or imports that you find necessary. (make sure that the package/package lock or requirements.txt files are updated accordingly)

[Task 3]
- The behaviour for a list with an empty `requiredItems` list is undefined. You do not need to handle this case.
- You can assume the returned `ingredients` in the recipe summary may be returned in any order.

## Getting set up
A basic flask/express application has been set up for you in `[py|ts]_template/devdonalds.py`, including some endpoints. To run it, enter `./run.sh` in the `[py|ts]_template` folder, and a server should be spun up on port 8080.

The script assumes you have the required runtimes installed for your chosen language.


## Testing
Basic assert-based tests are provided in the `autotester` directory, but they are not comprehensive, and we recommend doing some manual testing to ensure your solutions are correct.

In each of the `[py|ts]_template/` directories, a `test.sh` script has been provided.

You can run your implementation against the given tests by running `./test.sh` from within the directory of your chosen language. You may also choose to run tests for each individual part with:

```
./test.sh [part1 | part2 | part3]
```

The script once again assumes you have the required runtimes installed for your chosen language.

### Manual
If you would prefer to manually run the autotests. First start up your server in the `[py|ts]_template/` directory in one terminal, and then in another window:
```
cd autotester
npm i
npm run test(_part[1|2|3])
```
Note that you will need to restart the server (since the server put in some dummy data) to re-run the tests.

## Submission
To submit, push your solutions to your fork and submit a link to the fork in the application form. Your submissions will be reviewed by our Project Directors and considered holistically, taking in to account correctness, efficiency and code style.
