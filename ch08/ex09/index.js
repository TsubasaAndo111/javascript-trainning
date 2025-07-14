export function withResource(resource, fn) {
    try {
      fn(resource);
    } finally {
      resource.close();
    }
  }
  