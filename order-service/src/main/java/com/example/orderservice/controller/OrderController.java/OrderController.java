@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @PostMapping
    public void createOrder() {}

    @GetMapping("/my")
    public void getMyOrders() {}

    @GetMapping("/{id}")
    public void getOrder() {}

    @PutMapping("/{id}/status")
    public void updateStatus() {}

    @DeleteMapping("/{id}")
    public void cancelOrder() {}
}
