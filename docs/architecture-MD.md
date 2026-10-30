# Reviews Architecture - Muskan Devgan

## useReviews Hook

### What does it do?
The `useReviews` hook manages the review state used by the Reviews page. It provides the reviews, adds reviews, and removes reviews.

### Why is this logic in a hook?
The hook contains presentation state and connects the Reviews components to the service. This keeps review state management out of the components and makes the logic easier to reuse.

### Where is it used?
The hook is used in `reviews.tsx`. The Reviews component gets `reviews`, `addReview`, and `removeReview` from this hook.

---

## useFormFields Hook

### What does it do?
The `useFormFields` hook manages form input values and provides a function to reset an input.

### Why is this logic in a hook?
Managing input values is presentation logic. Using a hook prevents the same input state logic from being repeated in components.

### Where is it used?
I use this hook in `ReviewForm.tsx` for the recipe name, reviewer name, and comment fields.

---

## Review Service

### What does it do?
The `reviewService` contains the business logic for Reviews. It gets reviews, adds reviews, validates review information, and removes reviews.

### Why is this logic in a service?
Validation and rules about valid Review data are business logic. Keeping this logic in the service prevents the components and repository from handling business rules.

### Where is it used?
The `useReviews` hook calls the Review service when reviews need to be loaded, added, or removed.

---

## Review Repository

### What does it do?
The `reviewRepository` provides CRUD operations for Review data. It can create, read, update, and delete reviews.

### Why is this logic in a repository?
Accessing and changing the Review data is data-access logic. Keeping it in the repository separates data access from presentation and business logic.

### Where is it used?
The Review service uses the repository to access and modify the Review test data. The repository currently uses `reviewsData.ts` instead of a backend service.