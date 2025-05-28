using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using OrganiseMe.Models;
using OrganiseMe.Services;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;
    private readonly JwtService _jwtService;

    public AuthController(UserService userService, JwtService jwtService)
    {
        _userService = userService;
        _jwtService = jwtService;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        if (await _userService.ExistsAsync(user.Email))
            return BadRequest("Email already used.");

        await _userService.AddUserAsync(user);
        return Ok("User registered.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] OrganiseMe.Models.LoginRequest request)
    {
        var user = await _userService.GetByEmailAsync(request.Email);
        if (user == null || user.Password != request.Password)
            return Unauthorized("Invalid credentials");

        var token = _jwtService.GenerateToken(user.Email);
        return Ok(new { token });
    }

}









//using Microsoft.AspNetCore.Identity.Data;
//using Microsoft.AspNetCore.Mvc;
//using OrganiseMe.Models;
//using OrganiseMe.Services;

//[ApiController]
//[Route("api/[controller]")]
//public class AuthController : ControllerBase
//{
//    private readonly UserService _userService;
//    private readonly JwtService _jwtService;

//    public AuthController(UserService userService, JwtService jwtService)
//    {
//        _userService = userService;
//        _jwtService = jwtService;
//    }
//    [HttpPost("register")]
//    public async Task<IActionResult> Register([FromBody] User user)
//    {
//        if (await _userService.ExistsAsync(user.Email))
//            return BadRequest("Email already exists");

//        await _userService.AddUserAsync(user);
//        return Ok("User registered successfully");
//    }

//    [HttpPost("login")]
//    public async Task<IActionResult> Login([FromBody] LoginRequest request)
//    {
//        var user = await _userService.GetByEmailAsync(request.Email);
//        if (user == null || user.Password != request.Password)
//            return Unauthorized("Invalid credentials");

//        var token = _jwtService.GenerateToken(user.Email);
//        return Ok(new { token });
//    }


//}

